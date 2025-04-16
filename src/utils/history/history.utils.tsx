import { HistoryStatus } from '@/utils/dto/history.dto';
import { BookCheck, BookOpen, BookPlus, X } from 'lucide-react';

const statusIconMap = {
  [HistoryStatus.READING]: <BookOpen />,
  [HistoryStatus.TO_READ]: <BookPlus />,
  [HistoryStatus.READ]: <BookCheck />,
};

export function getHistoryStatusIcon(status: HistoryStatus | null, isNew: boolean) {
  if (status === null) {
    return isNew ? <X /> : null;
  }
  return statusIconMap[status];
}
