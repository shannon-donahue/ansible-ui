import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { compareStrings, useBulkConfirmation } from '../../../../../framework';
import { requestDelete } from '../../../../Data';
import { idKeyFn } from '../../../../hub/useHubView';
import { EdaGroup } from '../../../interfaces/EdaGroup';
import { useGroupColumns } from './useGroupColumns';
import { API_PREFIX } from '../../../constants';

export function useDeleteGroups(onComplete: (Groups: EdaGroup[]) => void) {
  const { t } = useTranslation();
  const confirmationColumns = useGroupColumns();
  const actionColumns = useMemo(() => [confirmationColumns[0]], [confirmationColumns]);
  const bulkAction = useBulkConfirmation<EdaGroup>();
  return useCallback(
    (Groups: EdaGroup[]) => {
      bulkAction({
        title: t('Permanently delete Groups', { count: Groups.length }),
        confirmText: t('Yes, I confirm that I want to delete these {{count}} Groups.', {
          count: Groups.length,
        }),
        actionButtonText: t('Delete Groups', { count: Groups.length }),
        items: Groups.sort((l, r) => compareStrings(l.name, r.name)),
        keyFn: idKeyFn,
        isDanger: true,
        confirmationColumns,
        actionColumns,
        onComplete,
        actionFn: (Group: EdaGroup) => requestDelete(`${API_PREFIX}/Groups/${Group.id}/`),
      });
    },
    [actionColumns, bulkAction, confirmationColumns, onComplete, t]
  );
}