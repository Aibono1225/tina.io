'use client';

// biome-ignore lint/style/useImportType: <TODO>
import React from 'react';
import { useTina } from 'tinacms/dist/react';

export type UseTinaProps = {
  query: string;
  variables: object;
  data: object;
};

export type TinaClientProps<T> = {
  props: UseTinaProps & T;
  Component: React.FC<{ tinaProps: { data: object }; props: T }>;
};

export function TinaClient<T>({ props, Component }: TinaClientProps<T>) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return <Component tinaProps={{ data }} props={props} />;
}
