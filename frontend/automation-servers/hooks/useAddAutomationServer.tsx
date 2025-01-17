import { Modal, ModalVariant } from '@patternfly/react-core';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { PageForm, PageFormSelectOption, usePageDialog } from '../../../framework';
import { PageFormTextInput } from '../../../framework/PageForm/Inputs/PageFormTextInput';
import { useAutomationServers } from '../contexts/AutomationServerProvider';
import { AutomationServer } from '../interfaces/AutomationServer';
import { AutomationServerType } from '../interfaces/AutomationServerType';
import { useIsValidUrl } from '../../common/validation/useIsValidUrl';

const ModalFormDiv = styled.div`
  padding: 24px;
`;

export function useAddAutomationServer() {
  const [_, setDialog] = usePageDialog();
  const addAutomationServer = useCallback(
    () => setDialog(<AddAutomationServerDialog />),
    [setDialog]
  );
  return addAutomationServer;
}

export function AddAutomationServerDialog() {
  const { t } = useTranslation();
  const isValidUrl = useIsValidUrl();

  const { setAutomationServers } = useAutomationServers();

  const [_, setDialog] = usePageDialog();
  const onClose = () => setDialog(undefined);
  const onSubmit = (data: AutomationServer) => {
    setAutomationServers((servers) => [...servers.filter((a) => a.url !== data.url), data]);
    onClose();
    return Promise.resolve();
  };

  return (
    <Modal
      title={t('Add automation server')}
      isOpen
      onClose={onClose}
      variant={ModalVariant.small}
      hasNoBodyWrapper
    >
      <ModalFormDiv>
        <PageForm
          submitText={t('Add automation server')}
          onSubmit={onSubmit}
          isVertical
          singleColumn
          disableScrolling
          disableBody
          disablePadding
          defaultValue={{ name: '', url: '', type: AutomationServerType.AWX }}
        >
          <PageFormTextInput<AutomationServer>
            label={t('Name')}
            name="name"
            placeholder={t('Enter a friendly name for the automation server')}
            isRequired
          />
          <PageFormTextInput<AutomationServer>
            label={t('Url')}
            name="url"
            placeholder={t('Enter the url of the automation server')}
            validate={isValidUrl}
            isRequired
          />
          <PageFormSelectOption<AutomationServer>
            label={t('Automation type')}
            name="type"
            placeholderText={t('Select automation type')}
            options={[
              {
                label: t('AWX Ansible server'),
                description: t(
                  'Define, operate, scale, and delegate automation across your enterprise.'
                ),
                value: AutomationServerType.AWX,
              },
              {
                label: t('Galaxy Ansible server'),
                description: t('Discover, publish, and manage your Ansible collections.'),
                value: AutomationServerType.HUB,
              },
              {
                label: t('EDA server'),
                description: t(
                  'Connect intelligence, analytics and service requests to enable more responsive and resilient automation.'
                ),
                value: AutomationServerType.EDA,
              },
            ]}
            isRequired
          />
        </PageForm>
      </ModalFormDiv>
    </Modal>
  );
}
