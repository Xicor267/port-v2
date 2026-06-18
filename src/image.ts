const assetImageModules = import.meta.glob('./assets/images/*.{png,jpg,jpeg,webp,svg}', {
  eager: true,
  import: 'default',
}) as Record<string, string>;

export function image(name: string): string {
  if (!name) return "";
  if (name.startsWith("http://") || name.startsWith("https://") || name.startsWith("data:")) {
    return name;
  }

  let cleanName = name.trim();
  if (cleanName.startsWith("/")) {
    cleanName = cleanName.slice(1);
  }

  const assetKeyCandidates = [
    `./assets/images/${cleanName}`,
    cleanName.includes('.') ? `./assets/images/${cleanName}` : "",
  ].filter(Boolean);

  for (const assetKey of assetKeyCandidates) {
    if (assetImageModules[assetKey]) {
      return assetImageModules[assetKey];
    }
  }

  if (!cleanName.includes('.')) {
    const matchingKey = Object.keys(assetImageModules).find((key) => {
      const fileName = key.split('/').pop() ?? '';
      return fileName.startsWith(`${cleanName}.`);
    });

    if (matchingKey) {
      return assetImageModules[matchingKey];
    }
  }

  const hasExtension = /\.[a-zA-Z0-9]+$/.test(cleanName);
  if (!hasExtension) {
    return `/${cleanName}.png`;
  }

  return `/${cleanName}`;
}