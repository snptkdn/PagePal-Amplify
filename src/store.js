import { readable, writable } from 'svelte/store';

// export const BackendHost = readable('http://localhost:3000');
export const BackendHost = readable('https://ozj1f452z4.execute-api.ap-northeast-1.amazonaws.com/dev');

export const CurrentUser = writable({
  ID: 0,
  Name: null
});

