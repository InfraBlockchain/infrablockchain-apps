// Copyright 2017-2023 @polkadot/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0

import React, { useEffect, useState } from 'react';

import { InputAddress, Modal, Toggle } from '@polkadot/react-components';

import { useTranslation } from './translate.js';

interface Props {
  className?: string | null;
  onChange: (FeePayer?: string) => void;
}

function FeePayer ({ className, onChange }: Props): React.ReactElement<Props> | null {
  const { t } = useTranslation();
  const [feePayer, setFeePayer] = useState<string | null>();
  const [showFeePayer, setShowFeePayer] = useState(false);

  useEffect((): void => {
    onChange(showFeePayer ? feePayer : undefined);
  }, [onChange, showFeePayer, feePayer]);

  return (
    <Modal.Columns
      className={className}
      hint={t<string>('Adding Transaction Fee Payer')}
    >
      <Toggle
        className='feePayerToggle'
        label={
          showFeePayer
            ? t<string>('Include an optional Fee Payer')
            : t<string>('Do not include a Fee Payer')
        }
        onChange={setShowFeePayer}
        value={showFeePayer}
      />
      {showFeePayer && (
        <InputAddress
          label={t<string>('fee payer (optional)')}
          onChange={setFeePayer}
          type='account'
        />
      )}
    </Modal.Columns>
  );
}

export default React.memo(FeePayer);
