interface DescriptionListProps {
  children: React.ReactNode;
}

export function DescriptionList(props: DescriptionListProps) {
  return <dl className="divide-y divide-gray-200">{props.children}</dl>;
}

interface DescriptionListItemProps {
  label: React.ReactNode;
  value: React.ReactNode;
}

function DescriptionListItem(props: DescriptionListItemProps) {
  return (
    <div className="lg:grid grid-cols-12 items-center py-2">
      <dt className="text-sm font-medium text-gray-500 lg:col-span-3">
        {props.label}
      </dt>
      <dd className="mt-1 text-sm text-gray-900 lg:col-span-9">
        {props.value}
      </dd>
    </div>
  );
}

DescriptionList.Item = DescriptionListItem;
