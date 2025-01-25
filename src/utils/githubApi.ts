export const fetchGithubRepository = async (
  url: string,
  token?: string
): Promise<Response> => {
  const regex = /github\.com\/([^/]+)\/([^/]+)/;
  const match = url.match(regex);

  if (!match) {
    throw new Error("Invalid GitHub repository URL");
  }

  const [, owner, repo] = match;
  const branch = "main";

  // First try to get the repository info to check access
  const repoUrl = `https://api.github.com/repos/${owner}/${repo}`;
  const headers: HeadersInit = {
    Accept: "application/vnd.github.v3+json",
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const repoResponse = await fetch(repoUrl, { headers });
  const repoData = await repoResponse.json();

  if (!repoResponse.ok) {
    if (repoResponse.status === 404) {
      throw new Error(
        "Repository not found. If this is a private repository, please provide an access token. " +
          'You can create one at https://github.com/settings/tokens?type=beta with "Read-only" access to code.'
      );
    }
    if (repoResponse.status === 401 || repoResponse.status === 403) {
      throw new Error(
        "Access denied. Please provide a valid access token for private repositories. " +
          'Create one at https://github.com/settings/tokens?type=beta with "Read-only" access to code.'
      );
    }
    throw new Error(repoData.message || "Failed to fetch repository");
  }

  if (repoData.private && !token) {
    throw new Error(
      "This is a private repository. Please provide an access token. " +
        'Create one at https://github.com/settings/tokens?type=beta with "Read-only" access to code.'
    );
  }

  // Then get the tree
  const treeUrl = `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`;
  return fetch(treeUrl, { headers });
};
