import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { StoreModel } from '../redux/store';

interface HomeProps {
    data: {
        loading: boolean;
    };
}

class home extends Component<HomeProps, {}> {
    public static propTypes = {};

    render() {
        const { data: { loading } } = this.props;
        return (
            <div>
                Home Page
            </div>
        )
    }
}

home.propTypes = {
    data: PropTypes.object.isRequired,
};

const mapState = (state: StoreModel) => ({
    data: state.data,
});

export default connect(mapState)(home);