import { QuestionDetails } from '@/domain/forum/enterprise/entities/value-objects/question-details'
import { AttachmentPresenter } from './attachment-presenter'

export class QuestionDetailsPresenter {
  static toHTTP(question: QuestionDetails) {
    return {
      questionId: question.questionId.toString(),
      authorId: question.author.toString(),
      author: question.author,
      title: question.title,
      content: question.content,
      slug: question.slug.value,
      attachments: question.attachments.map(AttachmentPresenter.toHTTP),
      bestAnswerId: question.bestAnswerId,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    }
  }
}
