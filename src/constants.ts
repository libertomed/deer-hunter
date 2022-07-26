
const constants = 
{
    EVENTS:
    {
        BULLETS:     'changeBullets',
        RESULTS:     'gameResult',
        STATUSLEVEL: 'statusLevel'
    },
    SCENES:
    {
        TUTORIAL: 'tutorial',
        LOAD:     'load',
        HUD:      'HUD',
        RESULTS:  'resultScreen',
        SHOOTER:  'shooter',
        LEVEL1:   'level1',
    },
    REGISTER:
    {
        BULLETS:             'bullets',
        POINTS:              'points',
        SCORE_DEER_ACTIVE:   'scoreDeerActive',
        SCORE_DEER_INACTIVE: 'scoreDeerInactive',
        REPLAY:              'replay',
        CONTINUE:            'continue',
        STATUSLEVEL:         'statusLevel',
        STARTLEVEL:          'startLevel'
    },
    BACKGROUND:
    {
        BACKGROUND:    'bgGame',
        RESULTSSCREEN: 'bgResults',
        SCOREBG:       'scoreBG'
    },
    RESULTS:
    {
        EXELENT: 'GREAT SSHOOTING!',
        GOOD:    'YOU CAN DO IT BETTER',
        BAD:     'ANOTHER TIME, MAYBE'
    },
    DEER:
    {
        ID: 'deerAtlas',
        ANIMATIONS: 
        {
            IDLE: 'idle',
            RUN: 'hop'
        }
    },
    SHOOTER:
    {
        ID: 'shooter',
        SHOOTBUTTON: 'shootButton',
        SCOPE: 'scope',
        SHOOTERPOINT: 'shootPoint',
        FIRE: 'fire',
        FIREANIM: 'animKey'
    }
}
export default constants;