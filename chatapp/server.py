import socket
import argparse
import threading

parser = argparse.ArgumentParser(description="Server")
parser.add_argument('--host',metavar='host',type=str,nargs='?',default=socket.gethostname())
parser.add_argument('--port',metavar='port',type=int,nargs='?',default=6548)
args = parser.parse_args()

print(f'server on: {args.host} on port: {args.port}')

s = socket.socket()
s.setsockopt(socket.SOL_SOCKET,socket.SO_REUSEADDR,1)

try:
    s.bind((args.host,args.port))
    s.listen(5)
except Exception as e:
    raise SystemExit(f'cannot bind HOST={args.host} PORT={args.port}, bc {e}.')

def on_new_client(client,conn):
    ip = conn[0]
    port = conn[1]
    print(f'new conn from {ip} and {port}')

    while True:
        msg = client.recv(1024)
        if msg.decode('utf-8') == 'exit':
            break
        print(f'from server: {msg}')
        reply = f'recv: {msg.decode()}'
        client.sendall(reply.encode('utf-8'))

    client.close()


while True:
    try:
        client, ip = s.accept()
        threading._start_new_thread(on_new_client,(client,ip))
    except KeyboardInterrupt as e:
        print(f'shutting down server')
    except Exception as e:
        print(f'not expecting this...')