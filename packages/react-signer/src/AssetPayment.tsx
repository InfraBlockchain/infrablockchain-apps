/* eslint-disable sort-keys */
/* eslint-disable header/header */
// Copyright 2017-2023 @polkadot/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useState } from 'react';

import { Modal, Toggle } from '@polkadot/react-components';
import { useApi } from '@polkadot/react-hooks';
import Params from '@polkadot/react-params';

import { useTranslation } from './translate.js';

export interface AssetPaymentInterface {
  assetId: unknown,
}

interface Props {
  className?: string;
  onChange: (vote?: AssetPaymentInterface) => void;
}

function AssetPayment ({ className, onChange }: Props): React.ReactElement<Props> | null {
  const { t } = useTranslation();
  const { api } = useApi();
  const [assetId, setAssetId] = useState<unknown>();
  const [showAssetPayment, setShowAssetPayment] = useState(false);

  useEffect((): void => {
    onChange(showAssetPayment
      ? {
        assetId
      }
      : {
        assetId: undefined
      });
  }, [onChange, showAssetPayment, assetId]);

  console.log(assetId);

  return (
    <Modal.Columns
      className={className}
      hint={t<string>('Adding Proof of Transaction AssetPayment')}
    >
      <Toggle
        className='assetPaymentToggle'
        label={
          showAssetPayment
            ? t<string>('Include an optional Asset ID')
            : t<string>('Do not include a Asset ID')
        }
        onChange={setShowAssetPayment}
        value={showAssetPayment}
      />
      {showAssetPayment && (
        <Params
          isDisabled={false}
          onChange={setAssetId}
          params={
            [{ name: 'id', type: { info: 10, type: 'StagingXcmV3MultiLocation', typeName: 'assetId' } }]
          }
          registry={api.registry}
        />
      )}
    </Modal.Columns>
  );
}

export default React.memo(AssetPayment);
