export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'balance_of' : IDL.Func([IDL.Text], [IDL.Nat], []),
    'http_request' : IDL.Func(
        [
          IDL.Record({
            'url' : IDL.Text,
            'method' : IDL.Text,
            'body' : IDL.Vec(IDL.Nat8),
            'headers' : IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text)),
            'certificate_version' : IDL.Opt(IDL.Nat16),
          }),
        ],
        [
          IDL.Record({
            'body' : IDL.Vec(IDL.Nat8),
            'headers' : IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text)),
            'upgrade' : IDL.Opt(IDL.Bool),
            'streaming_strategy' : IDL.Opt(
              IDL.Variant({
                'Callback' : IDL.Record({
                  'token' : IDL.Vec(IDL.Nat8),
                  'callback' : IDL.Func(
                      [IDL.Vec(IDL.Nat8)],
                      [
                        IDL.Opt(
                          IDL.Record({
                            'token' : IDL.Opt(IDL.Vec(IDL.Nat8)),
                            'body' : IDL.Vec(IDL.Nat8),
                          })
                        ),
                      ],
                      ['query'],
                    ),
                }),
              })
            ),
            'status_code' : IDL.Nat16,
          }),
        ],
        ['query'],
      ),
    'http_request_update' : IDL.Func(
        [
          IDL.Record({
            'url' : IDL.Text,
            'method' : IDL.Text,
            'body' : IDL.Vec(IDL.Nat8),
            'headers' : IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text)),
          }),
        ],
        [
          IDL.Record({
            'body' : IDL.Vec(IDL.Nat8),
            'headers' : IDL.Vec(IDL.Tuple(IDL.Text, IDL.Text)),
            'upgrade' : IDL.Opt(IDL.Bool),
            'streaming_strategy' : IDL.Opt(
              IDL.Variant({
                'Callback' : IDL.Record({
                  'token' : IDL.Vec(IDL.Nat8),
                  'callback' : IDL.Func(
                      [IDL.Vec(IDL.Nat8)],
                      [
                        IDL.Opt(
                          IDL.Record({
                            'token' : IDL.Opt(IDL.Vec(IDL.Nat8)),
                            'body' : IDL.Vec(IDL.Nat8),
                          })
                        ),
                      ],
                      ['query'],
                    ),
                }),
              })
            ),
            'status_code' : IDL.Nat16,
          }),
        ],
        [],
      ),
    'transform' : IDL.Func(
        [
          IDL.Record({
            'context' : IDL.Vec(IDL.Nat8),
            'response' : IDL.Record({
              'status' : IDL.Nat,
              'body' : IDL.Vec(IDL.Nat8),
              'headers' : IDL.Vec(
                IDL.Record({ 'value' : IDL.Text, 'name' : IDL.Text })
              ),
            }),
          }),
        ],
        [
          IDL.Record({
            'status' : IDL.Nat,
            'body' : IDL.Vec(IDL.Nat8),
            'headers' : IDL.Vec(
              IDL.Record({ 'value' : IDL.Text, 'name' : IDL.Text })
            ),
          }),
        ],
        ['query'],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
