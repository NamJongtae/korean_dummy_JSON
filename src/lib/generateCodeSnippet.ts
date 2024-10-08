export function generateCodeSnippet({
  fetchUrl,
  method,
  body,
  headers,
  isBlob
}: {
  fetchUrl: string;
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
  body?: object;
  headers?: object;
  isBlob?: boolean;
}) {
  let code = `fetch("${process.env.NEXT_PUBLIC_BASE_URL}/api${fetchUrl}"`;

  const needOptions = method !== "GET" || body || headers;

  if (needOptions) {
    code += `, {\n`;

    if (method !== "GET") {
      code += `  method: "${method}"${body ? "," : ""}\n`;
    }

    if (body) {
      code += `  body: JSON.stringify(${JSON.stringify(body, null, 4)}),\n`;
    }

    if (headers || (method !== "GET" && method !== "DELETE")) {
      code += `  headers: {\n`;
      code += `    "Content-Type": "application/json"`;

      if (headers) {
        code += `,\n`;
        Object.entries(headers).forEach(([key, value], index, array) => {
          code += `    "${key}": ${JSON.stringify(value)}`;
          if (index < array.length - 1) {
            code += `,\n`;
          }
        });
      }
      code += `\n  }\n`;
    }

    code += `}`;
  }

  code += `)\n  .then(response => ${isBlob ? "response.blob()" : "response.json()"})\n  .then(${isBlob ? "blob" : "data"} => console.log(${isBlob ? "blob" : "data"}))\n  .catch(error => console.error('Error fetching ${isBlob ? "blob" : "data"}:', error));\n`;

  return code;
}
