# Nextjs-template

### VSCode auto-format setting

Add the following extensions

-   Prettier - Code formatter
-   ESLint

```json
 // eslint & prettier auto format on save

  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ],
  "eslint.codeActionsOnSave.rules": null
```

### Deploying

#### Vercel

-   Create a branch named production

```
git checkout -b production
```

-   Create a Vercel [API Token](https://vercel.com/guides/how-do-i-use-a-vercel-api-access-token)

-   Run vercel login

```
npx vercel login
```

-   Run vercel link to create a new Vercel project and get your VERCEL_ORG_ID, and VERCEL_PROJECT_ID (.vercel/project.json) .

-   Inside GitHub, add VERCEL_TOKEN, VERCEL_ORG_ID, and VERCEL_PROJECT_ID as [secrets]("https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions")

Test the workflow by pushing modifications on the production brach.
