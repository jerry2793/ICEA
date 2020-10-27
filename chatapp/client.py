import socket
import argparse

parser = argparse.ArgumentParser(description="Client")
parser.add_argument('--host',metavar='host',type=str,nargs='?',default=socket.gethostname())
parser.add_argument('--port',metavar='port',type=int,nargs='?',default=6548)
args = parser.parse_args()

print(f'Conn from: {args.host} from port: {args.port}')

with socket.socket(socket.AF_INET,socket.SOCK_STREAM) as s:
    try:
        s.connect((args.host,args.port))
    except Exception as e:
        print(f'failed: HOST={args.host}, PORT={args.port}')
        raise SystemExit()

    while True:
        msg = input('msg: ')
        s.sendall(msg.encode('utf-8'))
        if msg == 'exit':
            break
        else:
            data = s.recv(1024)
            print(f'from server: {data}')

        