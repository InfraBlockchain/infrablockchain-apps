// Copyright 2017-2024 @polkadot/apps-config authors & contributors
// SPDX-License-Identifier: Apache-2.0

import type { OverrideBundleDefinition } from '@polkadot/types/types';

import { spec } from '@docknetwork/node-types';

export default (spec as { 'dock-test-runtime': OverrideBundleDefinition })['dock-test-runtime'];
