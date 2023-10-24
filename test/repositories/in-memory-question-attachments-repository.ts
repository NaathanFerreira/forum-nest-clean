import { QuestionAttachmentsRepository } from '@/domain/forum/application/repositories/question-attachments-repository'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'

export class InMemoryQuestionAttachmentsRepository
  implements QuestionAttachmentsRepository
{
  public items: QuestionAttachment[] = []

  async createMany(questionAttachments: QuestionAttachment[]): Promise<void> {
    this.items.push(...questionAttachments)
  }

  async deleteMany(questionAttachments: QuestionAttachment[]): Promise<void> {
    const attachments = this.items.filter((item) => {
      return !questionAttachments.some((attachment) => attachment.equals(item))
    })

    this.items = attachments
  }

  async findManyByQuestionId(questionId: string) {
    const questionAttachments = this.items.filter(
      (item) => item.questionId.toString() === questionId,
    )

    return questionAttachments
  }

  async deleteManyByQuestionId(questionId: string) {
    const questionAttachments = this.items.filter(
      (item) => item.questionId.toString() !== questionId,
    )

    this.items = questionAttachments
  }
}
