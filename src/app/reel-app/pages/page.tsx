
import * as React from 'react';

import './page.scss';

interface PageProps {
  children: JSX.Element,
}

export function Page(props: PageProps) {
  return (
    <div className="reel-page">
      {
        props.children
      }
    </div>
  )
}
