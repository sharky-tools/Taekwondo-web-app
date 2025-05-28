#!/bin/bash

# === CONFIGURATION ===
GITHUB_USER="your-username"      # ← change this
REPO_NAME="your-repo"            # ← change this
BRANCH="main"

# Make sure the GitHub token is set
if [ -z "$GITHUB_TOKEN" ]; then
  echo "❌ GITHUB_TOKEN environment variable is not set."
  exit 1
fi

echo "🚀 Starting deployment to GitHub Pages using main branch..."

# 1. Delete gh-pages branch from remote
echo "🗑️ Deleting gh-pages branch from remote (if exists)..."
git push origin --delete gh-pages 2>/dev/null || echo "gh-pages branch did not exist or was already deleted."

# 2. Add + commit + push local changes to main
echo "📦 Committing and pushing changes to main branch..."
git add .
git commit -m "Deploying latest changes to main for GitHub Pages" || echo "Nothing to commit."
git push origin $BRANCH

# 3. Change GitHub Pages source to main branch via GitHub API
echo "⚙️ Updating GitHub Pages settings to deploy from 'main' branch..."

curl -X PUT \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  "https://api.github.com/repos/$GITHUB_USER/$REPO_NAME/pages" \
  -d '{"source":{"branch":"main","path":"/"}}'

echo "✅ Done. GitHub Pages should now deploy from the 'main' branch."
