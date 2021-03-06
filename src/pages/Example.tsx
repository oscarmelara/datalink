import * as React from 'react';
import Tour, { Arrow, Badge, Close, Controls, Dot, Navigation } from 'reactour';

interface IProps {
}
interface IState {
    isTourOpen?: boolean
}
class CustomTour extends React.Component<{}, { isTourOpen: boolean }> {
    ref = React.createRef<Tour>();

    state = {
        isTourOpen: false,
        update: '13213'
    };

    render() {
        return (
            <div>
                <button className="opener" onClick={() => this.setState({ isTourOpen: true })}>
                    Open
                </button>
                <Tour
                    isOpen={this.state.isTourOpen}
                    steps={[
                        {
                            content: <div>Example</div>
                        },
                        {
                            content: ({ close, goTo, inDOM, step }) => (
                                <div>
                                    <Close onClick={() => close()} className="something" />
                                    <Controls className="im-a-div">
                                        <Arrow onClick={() => goTo(0)} label="Go to first step" />
                                        <Arrow
                                            className="hello"
                                            inverted
                                            onClick={() => goTo(2)}
                                            label={<pre>Go to next step</pre>}
                                        />
                                        <Arrow disabled onClick={() => console.log('do nothing')} />
                                    </Controls>
                                    <Navigation className="im-a-div">
                                        <Dot
                                            disabled
                                            current={1}
                                            index={0}
                                            showNumber
                                            accentColor="#000"
                                        />
                                    </Navigation>
                                    {inDOM ? 'Is in DOM' : 'Not in DOM'}, step: {step}
                                </div>
                            ),
                            selector: 'button.opener',
                            position: 'center',
                            stepInteraction: false,
                            style: {
                                display: 'flex'
                            },
                            action: (node: HTMLElement) => node.focus()
                        },
                        {
                            content: 'Last step',
                            selector: '.first-step',
                        }
                    ]}
                    onRequestClose={() => this.setState({ isTourOpen: false })}
                    accentColor="#f0123d"
                    badgeContent={(current, total) => (
                        <Badge accentColor="#f34">
                            {current} / {total}
                        </Badge>
                    )}
                    className="my-tour"
                    closeWithMask={false}
                    disableDotsNavigation={false}
                    disableInteraction
                    disableKeyboardNavigation={['esc']}
                    getCurrentStep={currentStep => console.log(currentStep)}
                    goToStep={4}
                    highlightedMaskClassName="mask-hi"
                    inViewThreshold={10}
                    lastStepNextButton={<span>Finish</span>}
                    maskClassName="mask"
                    maskSpace={10}
                    nextButton="Next"
                    nextStep={() => console.log('this would probably break something')}
                    onAfterOpen={target => target.focus()}
                    onBeforeClose={target => target.blur()}
                    prevButton="Prev"
                    prevStep={() => console.log("this would too but it's fine")}
                    rounded={3}
                    scrollDuration={100}
                    scrollOffset={1}
                    showNumber={false}
                    showButtons={false}
                    showCloseButton={false}
                    showNavigation={false}
                    showNavigationNumber={false}
                    startAt={1}
                    update={this.state.update}
                    updateDelay={2}
                >
                </Tour>
                <div className="first-step">
                        <h1>Prueba</h1>
                </div>
            </div>
        );
    }
}
export default (CustomTour)