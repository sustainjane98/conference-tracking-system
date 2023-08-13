'use client';

import { useContext } from 'react';
import { ConferenceContext } from '../../components/talks/conference-context-provider';

export const useConferenceContext = () => useContext(ConferenceContext);
