import { NotificationsRepository } from '@/domain/notification/application/repositories/notifications-repository'
import { Notification } from '@/domain/notification/enterprise/entities/notification'

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  public items: Notification[] = []

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.items.find(
      (notification) => notification.id.toString() === notificationId,
    )

    if (!notification) return null

    return notification
  }

  async create(notification: Notification): Promise<void> {
    this.items.push(notification)
  }

  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.items.findIndex(
      (notificationItem) => notificationItem.id === notification.id,
    )

    this.items[notificationIndex] = notification
  }
}
