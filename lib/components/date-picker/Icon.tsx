import clsx from "clsx";

export const Chevron = ({
  double = false,
  oritation = false,
}: {
  double?: boolean;
  oritation?: boolean;
}) => {
  return !double ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={clsx("lucide lucide-chevron", {
        "transform rotate-180": oritation,
      })}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={clsx("lucide lucide-chevron", {
        "transform rotate-180": oritation,
      })}
    >
      <path d="m6 17 5-5-5-5" />
      <path d="m13 17 5-5-5-5" />
    </svg>
  );
};
