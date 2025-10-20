TOP=$(git rev-parse --show-toplevel)

export HUBOT_ANSWER_TO_THE_ULTIMATE_QUESTION_OF_LIFE_THE_UNIVERSE_AND_EVERYTHING=42

if [[ -f ${TOP}/configuration/config.local.sh ]]; then
    source ${TOP}/configuration/config.local.sh
fi

export HUBOT_MAX_MESSAGE_LENGTH="2000"
