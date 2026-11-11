const providers = {
  'youtube.com': 'YouTube', 'www.youtube.com': 'YouTube', 'm.youtube.com': 'YouTube',
  'youtu.be': 'YouTube', 'www.youtube-nocookie.com': 'YouTube',
  'instagram.com': 'Instagram', 'www.instagram.com': 'Instagram',
  'facebook.com': 'Facebook', 'www.facebook.com': 'Facebook', 'm.facebook.com': 'Facebook', 'fb.watch': 'Facebook',
  'linkedin.com': 'LinkedIn', 'www.linkedin.com': 'LinkedIn',
  'x.com': 'X', 'www.x.com': 'X', 'twitter.com': 'X', 'www.twitter.com': 'X',
  'tiktok.com': 'TikTok', 'www.tiktok.com': 'TikTok', 'vm.tiktok.com': 'TikTok', 'vt.tiktok.com': 'TikTok',
};

export function getSocialSource(value) {
  try {
    const url = new URL(String(value).trim());
    const provider = providers[url.hostname];
    if (!provider || url.protocol !== 'https:' || url.port || url.username || url.password) return null;
    url.hash = '';
    let videoId = '';
    if (provider === 'YouTube') {
      const candidate = url.hostname === 'youtu.be' ? url.pathname.slice(1).split('/')[0]
        : url.searchParams.get('v') || url.pathname.match(/^\/(?:embed|shorts|live)\/([^/]+)/)?.[1];
      if (/^[\w-]{11}$/.test(candidate || '')) videoId = candidate;
      if (videoId) return { url: `https://www.youtube.com/watch?v=${videoId}`, provider, videoId };
    }
    return { url: url.href, provider, videoId };
  } catch { return null; }
}

export function safeImageUrl(value) {
  if (typeof value !== 'string') return '';
  if (/^\/(?!\/)/.test(value) && !value.includes('\\')) return value;
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password ? url.href : '';
  } catch { return ''; }
}
