import { BadRequestException, Controller, Get, Param } from '@nestjs/common'
import { z } from 'zod'
import { ZodValidationPipe } from '../pipes/zod-validation-pipe'
import { FetchQuestionCommentsUseCase } from '@/domain/forum/application/use-cases/fetch-question-comments'
import { CommentWithAuthorPresenter } from '../presenters/comment-with-author-presenter'

const pageQueryParamSchema = z
  .string()
  .optional()
  .default('1')
  .transform(Number)
  .pipe(z.number().min(1))

type PageQueryParamSchema = z.infer<typeof pageQueryParamSchema>

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema)

@Controller('/questions/:questionId/comments')
export class FetchQuestionCommentsController {
  constructor(
    private fetchQuestionCommentsUseCase: FetchQuestionCommentsUseCase,
  ) {}

  @Get()
  async handle(
    @Param('page', queryValidationPipe) page: PageQueryParamSchema,
    @Param('questionId') questionId: string,
  ) {
    const result = await this.fetchQuestionCommentsUseCase.execute({
      page,
      questionId,
    })

    if (result.isLeft()) {
      throw new BadRequestException()
    }

    const { comments } = result.value

    return {
      questionComments: comments.map((questionComment) =>
        CommentWithAuthorPresenter.toHTTP(questionComment),
      ),
    }
  }
}
