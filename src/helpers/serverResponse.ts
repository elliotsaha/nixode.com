import {NextResponse} from 'next/server';
import {redirect as nextRedirect} from 'next/navigation';

export class ServerResponse {
  public static serverError(message = 'an unexpected error has occurred') {
    return NextResponse.json({message}, {status: 500});
  }

  public static userError(message: string) {
    return NextResponse.json({message}, {status: 400});
  }

  public static success(data: string | object) {
    if (typeof data === 'string') {
      return NextResponse.json({message: data}, {status: 200});
    }
    return NextResponse.json(data, {status: 200});
  }

  public static redirect(url: string) {
    nextRedirect(url);
  }
}
