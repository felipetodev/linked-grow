export default function AuthLayout(props: { children: React.ReactNode }) {
  return (
    <div className="relative grid h-[calc(100%-48px)]">
      {props.children}
    </div>
  );
}
