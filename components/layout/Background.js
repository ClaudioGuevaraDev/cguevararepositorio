function Background() {
  return (
    <svg
      aria-hidden="true"
      className="absolute inset-0 -z-10 h-full w-full stroke-gray-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]">
      <defs>
        <pattern
          x="50%"
          y={-1}
          id="0787a7c5-978c-4f66-83c7-11c213f99cb7"
          width={200}
          height={200}
          patternUnits="userSpaceOnUse">
          <path d="M.5 200V.5H200" fill="none" />
        </pattern>
      </defs>
      <rect
        fill="url(#0787a7c5-978c-4f66-83c7-11c213f99cb7)"
        width="100%"
        height="100%"
        strokeWidth={0}
      />
    </svg>
  );
}

export default Background;
