interface AuthRequest {
  headers: {
    [key: string]: string | undefined;
    email?: string;
  };
}

interface AuthReply {
  status: (code: number) => {
    send: (body: { error: string; message: string }) => void;
  };
}

export async function authMiddleware(req: AuthRequest, reply: AuthReply) {
  const apiEmail = req.headers['email'];

  if (!apiEmail) {
    return reply.status(401).send({
      error: 'Unauthorized',
      message: 'Email header is required for authentication',
    });
  }
}
