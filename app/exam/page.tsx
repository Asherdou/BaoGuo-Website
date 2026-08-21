import { Suspense } from "react";
import { Exam } from "../components/Exam";

export default function ExamPage() {
  return <Suspense fallback={<main className="shell loading">正在准备试卷…</main>}><Exam /></Suspense>;
}

