import React from 'react';

export const withPerformanceTracking = (WrappedComponent) => {
    return class extends React.Component {
        componentDidMount() {
            console.time(`${WrappedComponent.name}_render`);
        }

        componentWillUnmount() {
            console.timeEnd(`${WrappedComponent.name}_render`);
        }

        render() {
            return <WrappedComponent {...this.props} />;
        }
    };
}; 