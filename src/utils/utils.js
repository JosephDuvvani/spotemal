const contentOverflow = (content, container) => {
  const totalWidth = container.x + content.width;
  const totalHeight = container.y + content.height;

  const x = totalWidth > container.width;
  const y = totalHeight > container.height;

  return { x, y };
};

export { contentOverflow };
