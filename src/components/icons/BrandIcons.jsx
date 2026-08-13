export function GitHubIcon({ className = "h-4 w-4", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" {...props}>
      <path d="M12 .8A11.2 11.2 0 0 0 .8 12.15c0 5 3.24 9.24 7.73 10.75.56.1.76-.25.76-.55v-2.08c-3.14.7-3.8-1.37-3.8-1.37-.51-1.34-1.25-1.7-1.25-1.7-1.03-.72.08-.7.08-.7 1.13.08 1.73 1.2 1.73 1.2 1.01 1.76 2.65 1.25 3.29.96.1-.75.39-1.25.7-1.54-2.5-.3-5.14-1.29-5.14-5.68 0-1.25.44-2.28 1.16-3.08-.12-.3-.5-1.5.11-3.04 0 0 .95-.31 3.1 1.18A10.54 10.54 0 0 1 12 6.12c.96 0 1.9.13 2.8.38 2.14-1.49 3.09-1.18 3.09-1.18.62 1.55.23 2.75.11 3.04.73.8 1.16 1.83 1.16 3.08 0 4.41-2.64 5.38-5.16 5.67.41.36.77 1.06.77 2.15v3.09c0 .3.2.66.78.55a11.29 11.29 0 0 0 7.65-10.75A11.2 11.2 0 0 0 12 .8Z" />
    </svg>
  );
}

export function InstagramIcon({ className = "h-4 w-4", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" {...props}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ className = "h-4 w-4", ...props }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true" {...props}>
      <path d="M14.15 8.06V6.64c0-.68.45-.84.77-.84h1.96V2.82L14.18 2.8c-3 0-3.69 2.25-3.69 3.69v1.57H8.12v3.08h2.37V21.2h3.66V11.14h2.72l.36-3.08h-3.08Z" />
    </svg>
  );
}
