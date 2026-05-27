import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0B2545",
        }}
      >
        <svg width="22" height="22" viewBox="0 0 40 40" fill="none">
          <path
            d="M8.5 11c0-1.1.9-2 2-2h19c1.1 0 2 .9 2 2v12.2c0 6.9-4.8 12.8-11.5 13.8C13.3 36 8.5 30.1 8.5 23.2V11z"
            stroke="#ffffff"
            strokeWidth="3"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          <path
            d="M14 15.5c0-.8.7-1.5 1.5-1.5h9c.8 0 1.5.7 1.5 1.5v7.8c0 4.6-3.1 8.6-7.5 9.4-4.4-.8-7.5-4.8-7.5-9.4v-7.8z"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        </svg>
      </div>
    ),
    { ...size },
  );
}
