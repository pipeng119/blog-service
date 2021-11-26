export interface Article {
    id: string; // 文章唯一标识
    title: string; //  标题
    summary: string; // 概要
    content: string; // 内容
    nikename: string; // 作者
    create_time: number; // 创建时间
    comment: number; // 评论数
    like: number; // 评论数
}
