import executeQuery from "@/src/db/db";
import { Review } from "@/src/types/review-type";
import { NextRequest, NextResponse } from "next/server";

// /api/posts
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;

    // page와 limit 값을 가져옵니다.
    const page = searchParams.get("page");
    const limit = searchParams.get("limit");
    const userId = searchParams.get("userId");
    const bookId = searchParams.get("bookId");

    // /api/reviews?userId={userId} 유저별 리뷰 목록
    if (userId) {
      try {
        const data = await executeQuery(
          "SELECT * FROM reviews WHERE userId = ? ORDER BY id",
          [userId]
        );

        return NextResponse.json(
          {
            message: "리뷰 목록 조회 성공",
            reviews: data
          },
          { status: 200 }
        );
      } catch (error) {
        console.error(error);
        return NextResponse.json(
          { message: "리뷰 목록 조회 실패" },
          { status: 500 }
        );
      }
    }

    // /api/reviews?bookId={bookId} 책 별 리뷰 목록
    if (bookId) {
      try {
        const data = await executeQuery(
          "SELECT * FROM reviews WHERE bookId = ? ORDER BY id",
          [bookId]
        );

        return NextResponse.json(
          {
            message: "리뷰 목록 조회 성공",
            reviews: data
          },
          { status: 200 }
        );
      } catch (error) {
        console.error(error);
        return NextResponse.json(
          { message: "리뷰 목록 조회 실패" },
          { status: 500 }
        );
      }
    }

    let sql;
    let values: Array<number> = [];
    let offset: number | null = null;
    let hasNextPage: boolean | null = null;

    if (page && limit) {
      // 페이지네이션 계산
      offset = (parseInt(page) - 1) * parseInt(limit);

      // SQL 쿼리에 LIMIT과 OFFSET 적용
      // /api/reviews?page={page}&limit={limit} 리뷰 목록 페이지
      sql = "SELECT * FROM reviews ORDER BY id LIMIT ? OFFSET ?";
      values = [parseInt(limit), offset];

      // hasNextPage 계산
      const totalReviews = 500;
      hasNextPage =
        offset !== null && offset + parseInt(limit || "0") < totalReviews;
    } else {
      // page 또는 limit가 없으면 전체 데이터를 조회
      // /api/reviews 댓글 목록
      sql = "SELECT * FROM reviews ORDER BY id";
    }

    // 데이터베이스 쿼리 실행
    const data = await executeQuery(sql, values);

    // 응답 객체 생성
    const response: {
      message: string;
      reviews: Review[];
      page?: number;
      limit?: number;
      hasNextPage?: boolean;
    } = {
      message: "리뷰 목록 조회 성공",
      reviews: data as Review[]
    };

    // 조건에 따라 page, limit, hasNextPage 추가
    if (page) response.page = parseInt(page);
    if (limit) response.limit = parseInt(limit);
    if (hasNextPage !== null) response.hasNextPage = hasNextPage;

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "리뷰 목록 조회 실패" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const { rating = 0, content = "" } = await req.json().catch(() => ({}));

  try {
    // 더미 데이터를 만듭니다 (실제 DB 수정 대신)
    const dummyData = {
      id: 501,
      rating,
      content,
      createdAt: new Date(),
      userId: 1,
      booksId: 1
    };
    return NextResponse.json(
      {
        message: "리뷰 생성 성공",
        review: dummyData
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
  }
}
