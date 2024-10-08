import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Layout from "@/src/components/commons/layout/layout";

const inter = Noto_Sans_KR({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Korean Dummy JSON",
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL as string),
  description: `한국어로 구성된 데이터를 통해 개발자들이 보다 현실적인 더미 데이터를 제공 받을 수 있습니다. 
    GET, POST, PUT, PATCH, DELETE 요청을 보내고 직접 테스트 해보고 학습해보세요.`,
    keywords: "korean JSON, placeholder json, korean placeholder json, dummy json, korean dummy json, 더미 데이터, API 테스트, GET, POST, PUT, PATCH, DELETE",
  verification: {
    google: "-LptG2gzye6iVIM8aZT5fiJGQqrMVVQVi2lpo1wcPv4",
    other: {
      "naver-site-verification": "113a089154e96d7d1603d689bb25f8ac2ac5f289"
    }
  },
  icons: {
    icon: "/icons/logo-icon.svg"
  },
  openGraph: {
    url: new URL(process.env.NEXT_PUBLIC_BASE_URL as string),
    title: "Korean Dummy JSON",
    description: `한국어로 구성된 데이터를 통해 개발자들이 보다 현실적인 더미 데이터를 제공 받을 수 있습니다. 
    GET, POST, PUT, PATCH, DELETE 요청을 보내고 직접 테스트 해보고 학습해보세요.`,
    images: {
      url: "/icons/logo-icon.svg"
    }
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko-KR">
      <body className={inter.className}>
        <Layout>
          <main className="pt-[76px] max-w-[1024px] mx-auto w-full">
            {children}
          </main>
        </Layout>
      </body>
    </html>
  );
}
