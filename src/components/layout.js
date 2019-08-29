import React from 'react';
import PropTypes from 'prop-types';
import { useStaticQuery, graphql } from 'gatsby';
import { AppProvider } from './Context';
import Transition from '../components/transition';

import '../fonts/futura.scss';
import './layout.scss';

const Layout = ({ children, location }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <AppProvider>
      <Transition location = {location}>
        <main>{children}</main>
      </Transition>
    </AppProvider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout;
