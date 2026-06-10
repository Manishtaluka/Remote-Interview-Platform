const JUDGE0_API = "https://ce.judge0.com";

const LANGUAGE_IDS = {
  javascript: 63, // Node.js
  python: 71, // Python 3
  java: 62, // Java OpenJDK
};

/**
 * Executes code using Judge0 CE
 *
 * @param {string} language
 * @param {string} code
 * @returns {Promise<{success:boolean, output?:string, error?:string}>}
 */
export async function executeCode(language, code) {
  try {
    language = language.toLowerCase();

    const languageId = LANGUAGE_IDS[language];

    if (!languageId) {
      return {
        success: false,
        error: `Unsupported language: ${language}`,
      };
    }

    // Submit code
    const submitResponse = await fetch(
      `${JUDGE0_API}/submissions?base64_encoded=false&wait=false`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          source_code: code,
          language_id: languageId,
        }),
      }
    );

    if (!submitResponse.ok) {
      return {
        success: false,
        error: `Submission failed: ${submitResponse.status}`,
      };
    }

    const submitData = await submitResponse.json();
    const token = submitData.token;

    // Poll result
    let result = null;

    for (let attempt = 0; attempt < 10; attempt++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const resultResponse = await fetch(
        `${JUDGE0_API}/submissions/${token}?base64_encoded=false`
      );

      if (!resultResponse.ok) {
        continue;
      }

      result = await resultResponse.json();

      if (
        result.status &&
        result.status.id !== 1 &&
        result.status.id !== 2
      ) {
        break;
      }
    }

    if (!result) {
      return {
        success: false,
        error: "Execution timeout",
      };
    }

    if (result.stderr) {
      return {
        success: false,
        error: result.stderr,
      };
    }

    if (result.compile_output) {
      return {
        success: false,
        error: result.compile_output,
      };
    }

    return {
      success: true,
      output: result.stdout || "No output",
    };
  } catch (error) {
    return {
      success: false,
      error: error.message || "Execution failed",
    };
  }
}