import React from 'react';
import { useSelector } from 'react-redux';

import { useFilters } from 'loot-core/src/client/data-hooks/filters';

import { useActions } from '../../hooks/useActions';
import tokens from '../../tokens';
import Button from '../common/Button';
import Select from '../common/Select';
import Text from '../common/Text';
import View from '../common/View';
import { useSidebar } from '../sidebar';

import { Setting } from './UI';

export default function DefaultFilter() {
  const { savePrefs } = useActions();
  const savedFilters = useFilters();

  const filterOptions = [{ id: '', name: 'None' }, ...savedFilters];

  const sidebar = useSidebar();
  const defaultFilter = useSelector(
    state => state.prefs.local.defaultFilterId || '',
  );

  return (
    <Setting
      primaryAction={
        <View
          style={{
            flexDirection: 'column',
            gap: '1em',
            width: '100%',
            [`@media (min-width: ${
              sidebar.floating
                ? tokens.breakpoint_small
                : tokens.breakpoint_medium
            })`]: {
              flexDirection: 'row',
            },
          }}
        >
          <Button bounce={false} style={{ padding: 0 }}>
            <Select
              bare
              value={defaultFilter}
              onChange={filterId => savePrefs({ defaultFilterId: filterId })}
              options={filterOptions.map(f => [f.id, f.name])}
              style={{ padding: '2px 10px', fontSize: 15 }}
            />
          </Button>
        </View>
      }
    >
      <Text>
        <strong>Default filter</strong> will apply one of your saved filters as
        a default when viewing your accounts.
      </Text>
    </Setting>
  );
}
