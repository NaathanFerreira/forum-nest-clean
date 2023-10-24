import { Attachment } from '@/domain/forum/enterprise/entities/attachment'
import { QuestionAttachment } from '@/domain/forum/enterprise/entities/question-attachment'
import { Prisma } from '@prisma/client'

export class PrismaAttachmentMapper {
  static toPrisma(
    attachment: Attachment,
  ): Prisma.AttachmentUncheckedCreateInput {
    return {
      id: attachment.id.toString(),
      title: attachment.title,
      url: attachment.url,
    }
  }

  static toPrismaUpdateMany(
    questionAttachments: QuestionAttachment[],
  ): Prisma.AttachmentUpdateManyArgs {
    const attachmentIds = questionAttachments.map((attachment) =>
      attachment.attachmentId.toString(),
    )

    return {
      where: {
        id: {
          in: attachmentIds,
        },
      },
      data: {
        questionId: questionAttachments[0].questionId.toString(),
      },
    }
  }
}
