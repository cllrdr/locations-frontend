import { type FC } from "react";
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";

interface Crumb { label: string; path?: string; }

export const BreadCrumbs: FC<{ crumbs: Crumb[] }> = ({ crumbs }) => (
  <Breadcrumb>
    {crumbs.map((c, i) => (
      <Breadcrumb.Item
        key={i}
        active={!c.path}
        linkAs={c.path ? Link : undefined}
        linkProps={c.path ? { to: c.path } : undefined}
      >
        {c.label}
      </Breadcrumb.Item>
    ))}
  </Breadcrumb>
);