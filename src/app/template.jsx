export default function Template({ children }) {
  // A plain wrapper keeps page content visible even when browser motion is disabled.
  return <div>{children}</div>;
}
