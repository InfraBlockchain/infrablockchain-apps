// Copyright 2017-2023 @polkadot/react-signer authors & contributors
// SPDX-License-Identifier: Apache-2.0
import React, { useEffect, useState } from 'react';

import { InputAddress, InputNumber, Modal, Toggle } from '@polkadot/react-components';
import { BN } from '@polkadot/util';

import { useTranslation } from './translate.js';

export interface PotVote {
  voteCandidate: string | null
}

interface Props {
  className?: string;
  onChange: (vote?: PotVote) => void;
}

function Vote ({ className, onChange }: Props): React.ReactElement<Props> | null {
  const { t } = useTranslation();
  const [voteCandidate, setVoteCandidate] = useState<string | null>();
  const [showVote, setShowVote] = useState(false);

  useEffect((): void => {
    onChange(showVote
      ? {
        voteCandidate: voteCandidate!
      }
      : {
        voteCandidate: null
      });
  }, [onChange, showVote, voteCandidate]);

  return (
    <Modal.Columns
      className={className}
      hint={t<string>('Adding Proof of Transaction voteCandidate')}
    >
      <Toggle
        className='voteToggle'
        label={
          showVote
            ? t<string>('Include an optional vote')
            : t<string>('Do not include a vote')
        }
        onChange={setShowVote}
        value={showVote}
      />
      {showVote && (
        <InputAddress
          label={t<string>('Vote Candidate (optional)')}
          onChange={setVoteCandidate}
          type='allPlus'
        />
      )}
    </Modal.Columns>
  );
}

export default React.memo(Vote);
