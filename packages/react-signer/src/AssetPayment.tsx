// Copyright 2017-2023 @polkadot/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';

import { InputNumber, Modal, Toggle } from '@polkadot/react-components';
import { BN, BN_ZERO } from '@polkadot/util';

import { useTranslation } from './translate.js';

export interface AssetPaymentInterface {
  paraId: BN | undefined, 
  palletId: BN | undefined, 
  assetId: BN | undefined,
}

interface Props {
  className?: string;
  onChange: (vote?: AssetPaymentInterface) => void;
}

function AssetPayment ({ className, onChange }: Props): React.ReactElement<Props> | null {
  const { t } = useTranslation();
  const [assetId, setAssetId] = useState<BN | undefined>();
  const [paraId, setParaId] = useState<BN | undefined>();
  const [palletId, setPalletId] = useState<BN | undefined>();
  const [showAssetPayment, setShowAssetPayment] = useState(false);

  useEffect((): void => {
    onChange(showAssetPayment
      ? {
        paraId: paraId === BN_ZERO ? undefined : paraId,
        palletId: palletId  === BN_ZERO ? undefined : palletId,
        assetId: assetId  === BN_ZERO ? undefined : assetId,
      }
      : {
        paraId: undefined,
        palletId: undefined,
        assetId: undefined,
      });
  }, [onChange, showAssetPayment, paraId, palletId, assetId]);

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
        <InputNumber
          isZeroable={false}
          label={t<string>('parachain ID (optional)')}
          onChange={setParaId}
        />
      )}
      {showAssetPayment && (
        <InputNumber
          isZeroable={false}
          label={t<string>('Pallet Index (optional)')}
          onChange={setPalletId}
        />
      )}
      {showAssetPayment && (
        <InputNumber
          isZeroable={false}
          label={t<string>('Asset ID (optional)')}
          onChange={setAssetId}
        />
      )}
    </Modal.Columns>
  );
}

export default React.memo(AssetPayment);