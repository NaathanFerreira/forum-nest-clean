import { AnswerAttachmentsRepository } from '@/domain/forum/application/repositories/answer-attachments-repository'
import { AnswerAttachment } from '@/domain/forum/enterprise/entities/answer-attachment'

export class InMemoryAnswerAttachmentsRepository
  implements AnswerAttachmentsRepository
{
  public items: AnswerAttachment[] = []

  async createMany(answerAttachments: AnswerAttachment[]): Promise<void> {
    this.items.push(...answerAttachments)
  }

  async deleteMany(answerAttachments: AnswerAttachment[]): Promise<void> {
    const attachments = this.items.filter((item) => {
      return !answerAttachments.some((attachment) => attachment.equals(item))
    })

    this.items = attachments
  }

  async findManyByAnswerId(answerId: string) {
    const answerAttachments = this.items.filter(
      (item) => item.answerId.toString() === answerId,
    )

    return answerAttachments
  }

  async deleteManyByAnswerId(answerId: string) {
    const answerAttachments = this.items.filter(
      (item) => item.answerId.toString() !== answerId,
    )

    this.items = answerAttachments
  }
}
