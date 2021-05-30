import React from 'react';
import { List, ListItem, ListItemMeta } from '@tencent/tdesign-react';

export default function BasicList() {
  const avatarUrl = 'https://tdesign.gtimg.com/list-icon.png';
  const listData = [
    { id: 1, content: '列表内容列表内容列表内容' },
    { id: 2, content: '列表内容列表内容列表内容' },
    { id: 3, content: '列表内容列表内容列表内容' },
    { id: 4, content: '列表内容列表内容列表内容' },
  ];
  return (
    <List size="small">
      {listData.map((item) => (
        <ListItem key={item.id}>
          <ListItemMeta avatar={avatarUrl} title="列表主内容" description="列表内容列表内容列表内容" />
        </ListItem>
      ))}
    </List>
  );
}
