export const EmailTemplate1 = (code: string) => {
    return `
    <body
    style="
        background-color: #ffffff;
        font-family: -apple-system, BlinkMacSystemFont, &quot;Segoe UI&quot;,
            Roboto, Oxygen-Sans, Ubuntu, Cantarell, &quot;Helvetica Neue&quot;,
            sans-serif;
    "
>
    <table
        align="center"
        role="presentation"
        cellspacing="0"
        cellpadding="0"
        border="0"
        width="100%"
        style="
            max-width: 37.5em;
            margin: 0 auto;
            padding: 20px 0 48px;
            width: 560px;
        "
    >
        <tr style="width: 100%">
            <td>
                <h1
                    style="
                        font-size: 24px;
                        letter-spacing: -0.5px;
                        line-height: 1.3;
                        font-weight: 400;
                        color: #484848;
                        padding: 17px 0 0;
                    "
                >
                    Your login code
                </h1>
                <table
                    style="padding: 10px"
                    align="center"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    role="presentation"
                    width="100%"
                >
                    <tbody>
                        <tr></tr>
                    </tbody>
                </table>
                <p
                    style="
                        font-size: 15px;
                        line-height: 1.4;
                        margin: 0 0 15px;
                        color: #3c4149;
                    "
                >
                    This code will only be valid for the next 5
                    minutes. 
                </p>
                <code
                    style="
                        font-family: monospace;
                        font-weight: 700;
                        padding: 1px 4px;
                        background-color: #dfe1e4;
                        letter-spacing: -0.3px;
                        font-size: 21px;
                        border-radius: 4px;
                        color: #3c4149;
                    "
                    >${code}</code
                >
                <hr
                    style="
                        width: 100%;
                        border: none;
                        border-top: 1px solid #eaeaea;
                        border-color: #dfe1e4;
                        margin: 42px 0 26px;
                    "
                />
                <a
                    target="_blank"
                    style="
                        color: #b4becc;
                        text-decoration: none;
                        font-size: 14px;
                    "
                    href="${
                        process.env.NEXTAUTH_URL || "http://localhost:3000"
                    }"
                    >Atlas</a
                >
            </td>
        </tr>
    </table>
</body>

    `;
};
