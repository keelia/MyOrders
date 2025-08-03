import { type ReactNode } from 'react';

interface ListProps<T> {
  dataSource: T[];
  rowKey?: ((item: T) => React.Key) | keyof T;
  renderItem?: (item: T, index: number) => ReactNode;
  header?: ReactNode
}

export default function List<T,>(props: ListProps<T>) {
  const { dataSource, rowKey, renderItem, header, } = props;
  const renderListItem = (item: T, index: number) => {
    if (!renderItem) {
      return null;
    }
    let key: any;

    if (typeof rowKey === 'function') {
      key = rowKey(item);
    } else if (rowKey) {
      key = item[rowKey];
    } else {
      key = (item as any).key;
    }

    if (!key) {
      key = `list-item-${index}`;
    }

    return <li className="flex justify-between gap-x-6 py-5" key={key}>
      {renderItem(item, index)}
    </li>;
  };

  return (
    <div>
      {header && <div>{header}</div>}
      <ul role="list" className="divide-y divide-gray-100">
        {dataSource.map(renderListItem)}
      </ul>
    </div>
  )
}
